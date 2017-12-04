FROM maven:3.5.0-jdk-8-alpine

WORKDIR /usr/src/intellead/intellead-security

COPY pom.xml ./

COPY src/main/java/intellead ./src/main/java/intellead

RUN mvn clean compile package

COPY src/main/resources/application-docker.yml ./application.yml

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/intellead-security-1.0-SNAPSHOT.jar"]