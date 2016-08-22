package controllers

import "github.com/revel/revel"

type Rsvp struct {
	*revel.Controller
}

type Comment struct {
	Id      int    ` json:"id" `
	Name    string ` json:"author" `
	Comment string ` json:"text" `
}

func (c Rsvp) Index() revel.Result {
	return c.Render()
}

func (c Rsvp) Data() revel.Result {
	response := make(map[string]interface{})
	response["error"] = nil
	comments := make([]Comment, 0)
	comments = append(comments, Comment{Id: 1, Name: "Pete Hunt", Comment: "This is one comment"})
	comments = append(comments, Comment{Id: 2, Name: "Jordan Walke", Comment: "This is *another* comment"})
	response["data"] = comments

	return c.RenderJson(response)
}
