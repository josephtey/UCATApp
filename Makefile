push:
	cd client; yarn build; aws s3 sync build/ s3://app.in2med.com.au