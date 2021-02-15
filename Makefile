push:
	cd client; yarn build; aws s3 sync build/ s3://app.in2med.com.au --profile in2med; aws s3 sync build/ s3://in2med --profile in2med