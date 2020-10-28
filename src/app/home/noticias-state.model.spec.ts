import {
    Noticia,
    initializeNoticiasState,
    InitMyDataAction,
    reducersNoticias,
    NuevaNoticiaAction
  } from '../domain/noticias-state.model';
  
  
  
  describe("reducersNoticias", function () {
    it("should reduce init data", function () {
      // setup
      var prevState = initializeNoticiasState();
      var action = new InitMyDataAction(["noticia 1", "noticia 2"]);
      // action
      var newState = reducersNoticias(prevState, action);
      // assertions
      expect(newState.items.length).toEqual(2);
      expect(newState.items[0].titulo).toEqual("noticia 1");
    });
    it("should reduce new item added", function () {
      var prevState = initializeNoticiasState();
      var action = new NuevaNoticiaAction(new Noticia("noticia 3"));
      var newState = reducersNoticias(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].titulo).toEqual('noticia 3');
    });
    it("should reduce new item added v2", function () {
      var prevState = initializeNoticiasState();
      var action = new NuevaNoticiaAction(new Noticia("noticia 3"));
      var newState = reducersNoticias(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].titulo).toEqual('noticia 3');
    });
  })
  