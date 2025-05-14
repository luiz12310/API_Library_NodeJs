FROM node:latest

WORKDIR /Develop

COPY . .

RUN rm -rf node_modules 
RUN npm i

CMD ["npm","start"]

EXPOSE 5027