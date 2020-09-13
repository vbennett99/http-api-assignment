const respondXML = (request, response, status, object) => {
    let parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(object, "text/xml");
    response.writeHead(status, {'Content-Type': 'application/xml' });
    response.write(xmlDoc);
    response.end();
};

module.exports = {  
};