#!/bin/bash

wait_for_db() {
  counter=0
  echo "Connecting to posrgress"
  while ! nc -z db 5432; do
    counter=$((counter+1))
    if [ $counter == 30 ]; then
      echo "Error: Couldn't connect to Postgres."
      exit 1
    fi
    echo "Trying to connect to Postgres at $postgres_address. Attempt $counter."
    sleep 1
  done
}

# Clean environment
if [ -f ./tmp/pids/server.pid ]; then
  echo -e "\nCleaning environment"
  rm -f tmp/pids/server.pid
fi

# Install dependencies
echo -e "\nChecking gems"
bundle install --quiet

# Initialize database if it's required
if [ ! -f ./tmp/db.sem ]; then
  echo -e "\nSetup database"
  bundle exec rake db:setup
  echo -e "\nRunning migrations"
  bundle exec rake db:migrate
  touch ./tmp/db.sem
fi

# Run!
echo -e "\nRunning server"
bundle exec rails server -b 0.0.0.0 -p 3001
