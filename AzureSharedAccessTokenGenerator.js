const AzureSharedAccessTokenGenerator = function () {

	this.evaluate = function () {
		return createSharedAccessToken(this.uri, this.sharedAccessKeyName, this.sharedAccessKey);
	};

	this.title = function (context) {
		return 'Azure SA Token';
	};

	this.text = function (context) {
		return this.sharedAccessKeyName;
	}

};

function createSharedAccessToken(uri, saName, saKey) {
  if (!uri || !saName || !saKey) {
    throw new Error('Missing required parameter');
  }
  const encoded = encodeURIComponent(uri),
		now = new Date(),
		week = 60 * 60 * 24 * 7,
		ttl = Math.round(now.getTime() / 1000) + week,
		signature = encoded + '\n' + ttl,
		hmacDynamicValue = new DynamicValue('com.luckymarmot.HMACDynamicValue', {
			input: signature,
			key: saKey,
			algorithm: 3, // 3 = SHA256
			encoding: 'Base64',
		}), // docs for this: https://paw.cloud/docs/dynamic-values/encoding_crypto
		hash = hmacDynamicValue.getEvaluatedString(),
		encodedHash = encodeURIComponent(hash);
  return (`SharedAccessSignature sr=${encoded}&sig=${encodedHash}&se=${ttl}&skn=${saName}`);
}

AzureSharedAccessTokenGenerator.identifier = 'gov.cancer.ccr.oit.AzureSharedAccessTokenGenerator';
AzureSharedAccessTokenGenerator.title = 'Azure Shared Access Token Generator';
AzureSharedAccessTokenGenerator.help = 'https://ccr.cancer.gov/';
AzureSharedAccessTokenGenerator.inputs = [
	InputField('uri', 'URI', 'String'),
	InputField('sharedAccessKeyName', 'Shared Access Key Name', 'String'),
	InputField('sharedAccessKey', 'Shared Access Key', 'String'),
];

registerDynamicValueClass(AzureSharedAccessTokenGenerator);
