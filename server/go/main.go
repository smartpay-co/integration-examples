package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	. "github.com/smartpay-co/sdk-go"
	"net/http"
	"os"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "http://localhost:3080")
	})
	router.StaticFile("/payment-success", "../client/build/payment-success.html")
	router.StaticFile("/payment-canceled", "../client/build/payment-canceled.html")
	router.POST("/create-smartpay-checkout", func(c *gin.Context) {
		var checkoutPayload CreateACheckoutSessionJSONRequestBody
		err := c.Bind(&checkoutPayload)
		if err != nil {
			fmt.Println(err)
			return
		}

		client, _ := NewClientWithResponses(os.Getenv("SECRET_KEY"), os.Getenv("PUBLIC_KEY"))
		response, err := client.CreateACheckoutSession(c.Request.Context(), checkoutPayload)
		if err != nil {
			fmt.Println(err)
			return
		}
		reader := response.Body
		defer reader.Close()
		contentLength := response.ContentLength
		contentType := response.Header.Get("Content-Type")
		c.DataFromReader(response.StatusCode, contentLength, contentType, reader, nil)
	})

	router.Run(":5001")
}
