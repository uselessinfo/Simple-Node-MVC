var config = {
    // Server
    "serverPort": "3000",
    "baseUrl": "http://localhost",

    // Controllers
    "defaultController": "default",
    "defaultAction": "index",
    "actionNotFound": "notFound",

    // Paths
    "controllerPath": "controllers",
    "modelPath": "models",
    "viewPath": "views",
    "publicPath": "public",
    "templatePath": "templates",

    // Templates
    "templateExtension": ".hbs",
    "templateLibrary": "Handlebars",
    "templateCompileMethod": "compile"
};

module.exports = config;