push_prod:
	cd client; yarn build; aws s3 sync build/ s3://app.in2med.com.au --profile in2med

push_dev: 
	cd client; yarn build; aws s3 sync build/ s3://ucat-app 