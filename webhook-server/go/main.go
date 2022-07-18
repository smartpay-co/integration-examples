package main

import (
	"bytes"
	"encoding/json"
	"log"
	"io/ioutil"
	"net/http"
	"github.com/smartpay-co/sdk-go"
)

func webhook(w http.ResponseWriter, r *http.Request) {
	signature := r.Header.Get("Smartpay-Signature")
	calculatedSignature := r.Header.Get("Calculated-Signature")

	if signature != calculatedSignature {
		log.Println("Signature verification failed.", signature, calculatedSignature)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var bodyBytes []byte
	var err error

	if r.Body != nil {
		bodyBytes, err = ioutil.ReadAll(r.Body)
		if err != nil {
			log.Printf("Body reading error: %v", err)
			return
		}
		defer r.Body.Close()
	}

	log.Printf("Headers: %+v\n", r.Header)

	if len(bodyBytes) > 0 {
		var prettyJSON bytes.Buffer
		if err = json.Indent(&prettyJSON, bodyBytes, "", "\t"); err != nil {
			log.Printf("JSON parse error: %v", err)
			return
		}
		log.Println(string(prettyJSON.Bytes()))
	} else {
		log.Printf("Body: No Body Supplied\n")
	}

	w.Write([]byte("OK"))
}

func main() {
	mux := http.NewServeMux()

	webhookHandler := http.HandlerFunc(webhook)
	mux.Handle("/", smartpay.CalculateWebhookSignatureMiddleware("YOUR_SIGNING_KEY", webhookHandler))

	log.Print("Listening on :3000...")
	err := http.ListenAndServe("0.0.0.0:3000", mux)
	log.Fatal(err)
}
