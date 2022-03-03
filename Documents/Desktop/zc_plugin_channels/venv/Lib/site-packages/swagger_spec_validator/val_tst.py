import json
import logging
from bravado_core.spec import Spec

rootLogger = logging.getLogger('')
rootLogger.setLevel(logging.DEBUG)

# client = SwaggerClient.from_url("file:/Users/sjaensch/development/yelp-main/yelp/component/internalapi_spec/swagger/swagger.json")
with open("/Users/sjaensch/development/yelp-main/yelp/component/internalapi_spec/swagger/swagger.json", "r") as f:
    sd = json.load(f)
spec = Spec.from_dict(sd, "file:/Users/sjaensch/development/yelp-main/yelp/component/internalapi_spec/swagger/swagger.json")