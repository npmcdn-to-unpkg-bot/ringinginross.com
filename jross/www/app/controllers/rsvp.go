package controllers

import "github.com/revel/revel"

type Rsvp struct {
	*revel.Controller
}

func (c Rsvp) Index() revel.Result {
	return c.Render()
}
