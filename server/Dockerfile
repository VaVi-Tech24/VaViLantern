FROM node:22-alpine
WORKDIR /game
COPY web/public ./web/public
COPY server ./server
RUN mkdir /data && chown node:node /data
ENV PORT=8787 SCORE_FILE=/data/scores.json
USER node
EXPOSE 8787
CMD ["node", "server/server.cjs"]
