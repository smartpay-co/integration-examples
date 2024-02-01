plugins {
  java
  application
}
tasks.wrapper {
  gradleVersion = "8.5"
}

java {
  sourceCompatibility = JavaVersion.VERSION_11
  targetCompatibility = JavaVersion.VERSION_11
}
application.mainClass = "Server"

repositories {
  mavenCentral()
}
dependencies {
  implementation("io.javalin", "javalin", "6.0.0")
  implementation("org.slf4j", "slf4j-simple", "2.0.10")
}
