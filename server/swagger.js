// swagger.js is a file that generates the Swagger documentation for the API. It uses swagger-jsdoc to generate the documentation based on the JSDoc comments in the route files. The swaggerUi and swaggerServe functions are used to serve the Swagger documentation on a specific route in the application.
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";

config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Role Based Access Control API",
      version: "1.0.0",
    },
     // servers: [
        //   {
        //     url: `${process.env.SWAGGER_STAGE_URL}/api`,
        //   },
        // ],
        // add authentication options
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Adjust path if necessary
};

const spec = swaggerJSDoc(options);

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(spec);

export { swaggerServe, swaggerSetup };
