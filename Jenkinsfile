pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend-jenkins') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontend-jenkins" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontend-jenkins"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontend-jenkins"
                xcopy /E /I /Y frontend-jenkins\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontend-jenkins"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('backend-jenkins') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\backend-jenkins.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\backend-jenkins.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\backend-jenkins" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\backend-jenkins"
                )
                copy "backend-jenkins\\target\\backend-jenkins.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}