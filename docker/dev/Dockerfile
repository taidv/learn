FROM amazonlinux:2018.03

# timezone (Asia/Tokyo)
ENV TZ JST-9

RUN \

    # system update
    yum -y update \

    # tools
    && yum -y install vi git zip unzip less jq \

    #java
    && yum -y install java-1.8.0-openjdk-devel \

    # embulk
    && curl --create-dirs -o ~/.embulk/bin/embulk \
         -L  "https://dl.embulk.org/embulk-latest.jar" \
    && chmod +x ~/.embulk/bin/embulk \

    && echo 'export PATH="$HOME/.embulk/bin:$PATH"' >> ~/.bashrc \
    && source ~/.bashrc \

    # in(CSV), out(ES)
    && embulk gem install \
                    embulk-output-elasticsearch \

    #filters
    && embulk gem install \
                embulk-filter-insert \
                embulk-filter-column \

;

WORKDIR /root

ENTRYPOINT ["/bin/sh", "-c", "while true; do echo Running; sleep 1000; done"]
