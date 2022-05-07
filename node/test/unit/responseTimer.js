var expect    = require("chai").expect;
var ResponseTimer =  require('./../../src/models/responseTimer');

describe('responseTimer', function(){
  describe('constructor', function(){
    it('it sets the startingtime', function(){
       var timer = new ResponseTimer(getDate());

       expect(timer.start).to.equal(10);
    });

    it('sets the default time', function(){
      var timer = new ResponseTimer();
      expect(timer.start).not.to.equal(null);
    })
  });
  describe('setConnection',function(){
    it('can set connectionTime', function (){
      var timer = new ResponseTimer(getDate(10));
      timer.setConnection(getDate(20));

      expect(timer.connection).to.equal(20)
    });
    it('sets the default time', function(){
      var timer = new ResponseTimer();
      timer.setConnection();
      expect(timer.connection).not.to.equal(null);
    })
  })

  describe('setDocuments',function(){
    it('can set documentTime', function (){
      var timer = new ResponseTimer(getDate(10));
      timer.setDocuments(getDate(20));

      expect(timer.documents).to.equal(20)
    });

    it('sets the default time', function(){
      var timer = new ResponseTimer();
      timer.setDocuments();
      expect(timer.documents).not.to.equal(null);
    })
  })

  describe('setResponse',function(){
    it('can set responseTime', function (){
      var timer = new ResponseTimer(getDate(10));
      timer.setResponse(getDate(20));

      expect(timer.response).to.equal(20)
    });
    // it('sets the response time', function(){
    //   var timer = new ResponseTimer();
    //   timer.setResponse();
    //   // expect(timer.response).not.to.equal(null);
    // })
  })

  describe('connectTime',function(){
    it('can calculate connectionTime', function (){
      var timer = new ResponseTimer(getDate(10));
      timer.setConnection(getDate(20));

      expect(timer.connectTime).to.equal(10)
    });
  })

  describe('documentTime',function(){
    it('can calculate documenTime', function (){
    var timer = new ResponseTimer(getDate(10));
    timer.setDocuments(getDate(20));

    expect(timer.documentTime).to.equal(10);
    });
  })

  describe('responseTime',function(){
    it('can calculate responseTime', function (){
      var timer = new ResponseTimer(getDate(10));
      timer.setResponse(getDate(20));

      expect(timer.responseTime).to.equal(10)
    });
  })

});

function getDate(delay = 10){
  var date = new Date();
  date.setTime(delay);
  return date;
}
