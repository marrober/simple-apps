COPY layer.js /opt/app-root/src/layer.js
COPY node_modules/ /opt/app-root/src/node_modules/
USER 0
RUN chmod a+w /var/log
USER 1001
ENTRYPOINT ["node"]
CMD ["/opt/app-root/src/layer.js"]
