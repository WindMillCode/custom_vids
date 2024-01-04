FROM openjdk:17-jdk-slim
EXPOSE 4050
ADD target/ewallet-0.0.1-SNAPSHOT.jar ewallet.jar
ENTRYPOINT ["java","-jar","/ewallet.jar"]