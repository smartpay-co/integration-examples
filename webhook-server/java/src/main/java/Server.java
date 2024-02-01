import io.javalin.Javalin;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.stream.IntStream;

import static java.nio.charset.StandardCharsets.UTF_8;

class SmartpaySigner {
  private static final int N = 30;
  private static final BigInteger _62 = BigInteger.valueOf(62);
  private static final BigInteger[] VALUES = IntStream
    .rangeClosed(0, 'z')
    .mapToObj(i -> BigInteger.valueOf("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(i)))
    .toArray(BigInteger[]::new);

  private static BigInteger toValue(String s) {
    var result = BigInteger.ZERO;
    for (var i = 0; i < s.length(); i++) {
      try {
        var value = VALUES[s.charAt(i)];
        if (value.signum() >= 0) {
          result = result.multiply(_62).add(value);
          continue;
        }
      } catch (ArrayIndexOutOfBoundsException ignored) {
      }
      throw new NumberFormatException("Invalid base62 string - " + s);
    }
    return result;
  }

  static byte[] decode(String s) {
    var value = toValue(s).toByteArray();
    var m = value.length;
    if (m == N) return value;
    var result = new byte[N];
    System.arraycopy(value, Math.max(0, m - N), result, Math.max(0, N - m), Math.min(m, N));
    return result;
  }
}

public class Server {
  static BigInteger toUnsignedBigInteger(byte[] bytes) {
    var signed = new BigInteger(bytes);
    return signed.signum() >= 0 ? signed : BigInteger.ONE.shiftLeft(8 * bytes.length).add(signed);
  }

  public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeyException {
    var sharedMac = Mac.getInstance("HmacSHA256");
    var secret = Objects.requireNonNull(System.getenv("SECRET_KEY"), "SECRET_KEY");
    sharedMac.init(new SecretKeySpec(SmartpaySigner.decode(secret), "HmacSHA256"));

    Javalin
      .create()
      .before(context -> {
        var signature = context.header("Smartpay-Signature");
        var timestamp = context.header("Smartpay-Signature-Timestamp");

        if (signature != null && timestamp != null) {
          var mac = (Mac) sharedMac.clone();
          mac.update(timestamp.getBytes(UTF_8));
          mac.update((byte) '.');
          mac.update(context.bodyAsBytes());

          if (toUnsignedBigInteger(mac.doFinal()).equals(new BigInteger(signature, 16))) {
            return;
          }
        }
        context.status(400).skipRemainingHandlers();
      })
      .post("webhooks", context -> System.out.println(context.body()))
      .start(8080);
  }
}
