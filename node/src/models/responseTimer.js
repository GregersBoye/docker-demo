module.exports = class ResponseTimer {
  start = null;

  connection = 0;

  documents = 0;

  response = 0;

  constructor(date = new Date()) {
    this.start = date.getTime();
  }

  setConnection(date = new Date()) {
    this.connection = date.getTime();
  }

  setDocuments(date = new Date()) {
    this.documents = date.getTime();
  }

  setResponse(date = new Date()) {
    this.response = date.getTime();
  }

  get connectTime() {
    return this.connection - this.start;
  }

  get documentTime() {
    return this.documents - this.start;
  }

  get responseTime() {
    return this.response - this.start;
  }
};
