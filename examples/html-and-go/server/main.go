package main

import (
	"github.com/gin-gonic/gin"
	. "github.com/smartpay-co/sdk-go"
	"net/http"
	"os"
)

func main() {
	router := gin.Default()
	router.StaticFile("/demo.css", "../client/build/demo.css")
	router.StaticFile("/", "../client/build/index.html")
	router.StaticFile("/payment-success", "../client/build/payment-success.html")
	router.StaticFile("/payment-canceled", "../client/build/payment-canceled.html")
	router.POST("/create-smartpay-checkout", func(c *gin.Context) {
		client, _ := NewClientWithResponses(os.Getenv("SECRET_KEY"), os.Getenv("PUBLIC_KEY"))

		checkoutPayload := CreateACheckoutSessionJSONRequestBody{
			Currency: CurrencyJPY,
			Amount:   350,
			Items: []Item{
				{Name: "レブロン 18 LOW", Amount: 250, Currency: CurrencyJPY, Quantity: 1},
			},
			ShippingInfo: ShippingInfo{
				Address:     Address{Country: AddressCountryJP, PostalCode: "123", Locality: "locality", Line1: "line1"},
				FeeAmount:   Ptr(float32(100)),
				FeeCurrency: Ptr(CurrencyJPY),
			},
			CaptureMethod: Ptr(CaptureMethodManual),
			Reference:     Ptr("order_ref_1234567"),
			SuccessUrl:    "https://docs.smartpay.co/example-pages/checkout-successful",
			CancelUrl:     "https://docs.smartpay.co/example-pages/checkout-canceled",
		}

		result, err := client.CreateACheckoutSessionWithResponse(c.Request.Context(), checkoutPayload)
		if err != nil {
			panic(err)
		}
		checkoutUrl := string(*result.JSON200.Url)
		c.Redirect(http.StatusSeeOther, checkoutUrl)
	})
	router.Run(":5001")
}
