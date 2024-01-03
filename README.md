# Azure Shared Access Token Dynamic Value Generator

This is a simple Paw/RapidAPI extension that generates an Azure shared access token for authorization to Azure's APIs; it uses the exact method described in [Azure's documentation](https://learn.microsoft.com/en-us/rest/api/eventhub/generate-sas-token), and dynamically generates a token that has a one-week lifespan.

In Paw/RapidAPI, just add an `Authorization` header that then uses this dynamically-generated value; in the value's configuration, specify the URI to the Azure object (e.g., for a Service Bus queue, the queue URI), and the shared access key name and value.
