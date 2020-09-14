const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message></response>`;
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';
    if (type === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondXML(request, response, 400, responseXML);
    }
    return respondJSON(request, response, 400, responseJSON);
  }

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message></response>`;
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, type, params) => {
  const responseJSON = {
    message: 'This user is authorized',
  };

  // if nessecary param is not present
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'This user is unauthorized, please set loggedIn value to yes';
    responseJSON.id = 'unauthorized';
    if (type === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondXML(request, response, 401, responseXML);
    }
    return respondJSON(request, response, 401, responseJSON);
  }

  // if param is present
  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message></response>`;
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'This user is forbidden from this page',
    id: 'forbidden',
  };

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
    return respondXML(request, response, 403, responseXML);
  }
  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal error, please try again later',
    id: 'internal',
  };

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
    return respondXML(request, response, 500, responseXML);
  }
  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'This page is not yet implemented, please try again later',
    id: 'notImplemented',
  };

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
    return respondXML(request, response, 501, responseXML);
  }
  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
    return respondXML(request, response, 404, responseXML);
  }
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
