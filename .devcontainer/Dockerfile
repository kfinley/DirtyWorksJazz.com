ARG VARIANT=22-bookworm
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

RUN su node -c "source /usr/local/share/nvm/nvm.sh && \
  npm install -g \
  aws-cdk \
  @vue/cli \
  wscat \
  typescript \
  && npm cache clean --force >/dev/null" 2>&1

RUN npm completion >> ~/.bashrc

ENV RUNLEVEL 1
RUN echo '#!/bin/sh' > /usr/sbin/policy-rc.d && \
  echo 'exit 0' >> /usr/sbin/policy-rc.d && \
  chmod +x /usr/sbin/policy-rc.d

# Install Docker CE CLI
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  gnupg \
  && install -m 0755 -d /etc/apt/keyrings \
  && curl -fsSL https://download.docker.com/linux/debian/gpg \
  -o /etc/apt/keyrings/docker.asc \
  && chmod a+r /etc/apt/keyrings/docker.asc \
  && printf '%s\n' \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian bookworm stable" \
  > /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends docker-ce-cli docker-buildx-plugin docker-compose-plugin \
  && rm -rf /var/lib/apt/lists/*
  
# Install python and sound tools
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  ffmpeg \
  python3 \
  python3-dev \
  python3-venv \
  build-essential \
  pkg-config \
  libopus-dev \
  && python3 -m venv "${VIRTUAL_ENV}" \
  && "${VIRTUAL_ENV}/bin/python" -m pip install --upgrade pip setuptools wheel \
  && PKG_CONFIG_PATH=/usr/lib/aarch64-linux-gnu/pkgconfig:/usr/lib/pkgconfig \
  "${VIRTUAL_ENV}/bin/python" -m pip install --no-cache-dir \
  demucs \
  diffq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /root/.cache
  
# Install Docker Compose
RUN export LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")') \
  && curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
  && chmod +x /usr/local/bin/docker-compose
ARG NONROOT_USER=node

RUN echo -e "#!/bin/sh\n\
  sudoIf() { if [ \"\$(id -u)\" -ne 0 ]; then sudo \"\$@\"; else \"\$@\"; fi }\n\
  SOCKET_GID=\$(stat -c '%g' /var/run/docker.sock) \n\
  if [ \"${SOCKET_GID}\" != '0' ]; then\n\
  if [ \"\$(cat /etc/group | grep :\${SOCKET_GID}:)\" = '' ]; then sudoIf groupadd --gid \${SOCKET_GID} docker-host; fi \n\
  if [ \"\$(id ${NONROOT_USER} | grep -E \"groups=.*(=|,)\${SOCKET_GID}\(\")\" = '' ]; then sudoIf usermod -aG \${SOCKET_GID} ${NONROOT_USER}; fi\n\
  fi\n\
  exec \"\$@\"" > /usr/local/share/docker-init.sh \
  && chmod +x /usr/local/share/docker-init.sh

# run the installation script
RUN curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh \
  && /bin/zsh ~/.zshrc

# VS Code overrides ENTRYPOINT and CMD when executing `docker run` by default.
# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]

CMD [ "sleep", "infinity" ]
