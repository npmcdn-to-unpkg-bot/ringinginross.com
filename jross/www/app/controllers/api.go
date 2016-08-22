package controllers

import (
	"fmt"

	"github.com/revel/revel"
	"github.com/twinj/uuid"
)

type Api struct {
	*revel.Controller
}

type Response struct {
	Authenticated bool   ` json:"auth" `
	UUID          string ` json:"uuid" `
}

func (c Api) Authentication() revel.Result {
	// compare with the password value
	response := Response{Authenticated: true}
	return c.RenderJson(response)
}

func (c Api) Registration() revel.Result {
	// do a lookup for the user
	u := uuid.NewV4()
	response := Response{UUID: fmt.Sprintf("%s", u)}
	return c.RenderJson(response)
}
