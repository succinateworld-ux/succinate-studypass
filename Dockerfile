FROM node:24-alpine
WORKDIR /app
COPY StudyPass-runtime.tar.gz /tmp/StudyPass-runtime.tar.gz
RUN tar -xzf /tmp/StudyPass-runtime.tar.gz -C /app && rm /tmp/StudyPass-runtime.tar.gz && npm test
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV ZCASH_NETWORK=testnet
EXPOSE 10000
CMD ["node", "server.mjs"]