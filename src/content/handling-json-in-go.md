---
title: Handling JSON in Go
description: Go was built for the modern world. So let's talk about encoding and decoding the most popular data-interchange format.
date: 2019-09-18
---

Go was built with the modern web in mind. Native concurrency as well as packages like
["net/http"](https://golang.org/pkg/net/http/) for client and server interactions are just the tip of the iceburg
of all the goodness that's packed into Go. Of course, if you plan on developing anything for the web, you will without
a doubt come across JSON. While encoding and decoding JSON in other languages such as Java can be a pain, Go's
["encoding/json"](https://golang.org/pkg/encoding/json/) package provides all you need to handle those pesky JSON strings.

## Marshalling JSON

First thing's first. You want to encode a JSON string. For that, we use the `Marshal` function.

```go
func Marshal(v interface{}) ([]byte, error)
```

For example, to encode a `User` we can do

```go
// User Don't forget to annotate exported values
type User struct {
    Username string
    Password string
}

myUser := User{
    Username: "Sebastian",
    Password: "Its@S3cret",
}

b, err := json.Marshal(myUser)
```

If all goes right, then you should see that

```go
b == []byte(`{"Username": "Sebastian","Password":"Its@S3cret"}`)
```

However, in the real world,
the field names in JSON often do not match up with your declared field names. In this case, you can trail the struct field
declarations with a string literal (called tags) in the following format

```go
type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
}
```

This would produce a JSON string that looks like this:

```go
{"username": "Sebastian","password":"Its@S3cret"}
```

Additionally, there are a few other options other than renaming the field:

```go
// Use 'omitempty' if you would like to omit the field when empty
Username string `json:"username,omitempty"`

// Use 'string' to force the value to be encoded as a JSON string
Age int `json:"age,string"`

// Use '-' to ignore the field completly
Hidden string `json:"-"`
```

Of course, you can choose to keep the original field name and still use one of these options. Simply include
a comma before the option.

```go
// Keep my field name as 'Password', but omit it when empty
Password string `json:",omitempty"`
```

If you would like to make your output look a little prettier, you can use the `MarshalIndent` function

```go
func MarshalIndent(v interface{}, prefix, indent string) ([]byte, error)
```

which will add a prefix and an indent before each new JSON element. So now you know how to encode JSON,
but what about decoding?

## Unmarshaling

Decoding is done in a similar fashion, using the `Unmarshal` function.

```go
func Unmarshal(data []byte, v interface{}) error
```

In this case, we simply want to work the other way around. Given

```go
b := []byte(`{"username":"Meredith","password":"notsecure"}`)
```

you can decode with the following

```go
var myUser User

err := json.Unmarshal(b, &myUser)
```

and now `myUser` represents the decoded value `b`. Hooray!

> ⚠️ Unmarshal will only decode fields that are valid for the target type. Invalid fields are ignored.

---

## Additional knowledge

The types that Go associates JSON with are as follows:

- booleans are `bool`
- strings are `string`
- numbers are `float64`
- null is `nil`

If you would like to check the validity of a JSON string, you can use `Valid`

```go
func Valid(data []byte) bool
```

Overall, there is some really nice functionality built in to Go which makes life that much easier. To learn more
about this package, I encourage you to read the official [package docs](https://golang.org/pkg/encoding/json/).
