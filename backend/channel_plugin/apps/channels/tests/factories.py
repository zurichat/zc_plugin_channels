import faker
from apps.channels.models import Channel
from django.utils.text import slugify
from factory import Factory, Faker, LazyAttribute, lazy_attribute

fake = faker.Faker()


class ChannelFactory(Factory):

    name = Faker("company")
    description = Faker("paragraph")
    topic = Faker("catch_phrase")
    private = Faker("boolean")
    default = LazyAttribute(lambda o: False if o.private else fake.boolean())
    slug = LazyAttribute(lambda o: slugify(o.name))

    @lazy_attribute
    def owner(self):
        return "".join(fake.uuid4().split("-"))

    @lazy_attribute
    def users(self):
        data = {
            self.owner: {
                "_id": self.owner,
                "is_admin": True,
                "role": None,
                "starred": fake.boolean(),
                "notifications": {
                    "web": "all",
                    "mobile": "all",
                    "same_for_mobile": True,
                    "mute": True,
                },
            }
        }
        return data

    class Meta:
        model = Channel
