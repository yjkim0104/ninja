pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                echo 'building the application...'
                sh 'echo `id`'
            }
        }
        stage('test') {
            steps {
                echo 'testing the application...'
            }
        }
        stage('deploy') {
            steps {
                echo 'deploying the application...'
                // copy front source to 192.168.0.221
                sh 'cp -r /var/jenkins_home/.ssh/ /root/.ssh/'
                sh 'chmod 600 /root/.ssh/*'
                sh 'scp -r /var/jenkins_home/workspace/NinJa/ root@192.168.0.221:/usr/share/nginx/html'

            }
        }
    }
}


