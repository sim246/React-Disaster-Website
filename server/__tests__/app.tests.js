

test("responds to api/v1/:year/natural-disasters/:type", () => {
  const res = { 
    text: "",
    send: function(input) {
      this.text = input 
    } 
  };
});