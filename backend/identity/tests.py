from rest_framework import status
from rest_framework.reverse import reverse

from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from identity.factories import UserFactory, User


class LoginTests(APITestCase):
    @property
    def url(self):
        return reverse('login')

    def setUp(self):
        super(LoginTests, self).setUp()
        self.user = UserFactory()

    def test_login_required_fields(self):
        response = self.client.post(self.url, data={})
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {'email': ['This field is required.'],
                                 'password': ['This field is required.']}

    def test_login_valid(self):
        response = self.client.post(self.url, data={'email': self.user.email, 'password': 'defaultpassword'})
        print(response.data)

        assert response.status_code == status.HTTP_200_OK

    def test_login_invalid_password(self):
        response = self.client.post(self.url, data={'email': self.user.email, 'password': 'abc123'})
        print(response.data)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class RegisterTests(APITestCase):
    @property
    def url(self):
        return reverse('register')

    def setUp(self):
        super(RegisterTests, self).setUp()

    def test_register_required_fields(self):
        response = self.client.post(self.url, data={})
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == response.data == {'email': ['This field is required.'],
                                                  'password': ['This field is required.']}

    def test_register_valid(self):
        response = self.client.post(self.url, data={'email': 'james.doe@test.com', 'password': 'defaultpassword'})
        print(response.data)

        assert response.status_code == status.HTTP_200_OK

    def test_register_with_name(self):
        response = self.client.post(self.url, data={'email': 'james.doe@test.com', 'password': 'defaultpassword',
                                                    'first_name': 'James', 'last_name': 'Doe'})
        print(response.data)

        assert response.status_code == status.HTTP_200_OK

        user = User.objects.get(id=response.data.get('id'))
        assert user.email == 'james.doe@test.com'
        assert user.first_name == 'James'
        assert user.last_name == 'Doe'


class AuthenticatedAPITestCase(APITestCase):
    """
    Base class for tests that need authenticated access to the APIs.
    """

    def setUp(self):
        self.user = UserFactory()
        self.client = self.get_client(self.user)

    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def get_client(self, user=None):
        if user:
            token = self.get_token(user)
            client = self.client_class(HTTP_AUTHORIZATION='Bearer {0}'.format(token))
            client.user = user
            client.auth_token = token
        else:
            return self.client_class()
        return client


class UserTests(AuthenticatedAPITestCase):
    @property
    def url(self):
        return reverse('user')

    def setUp(self):
        super(UserTests, self).setUp()

    def test_retrieve(self):
        response = self.client.get(self.url)
        print(response.data)
        assert response.status_code == status.HTTP_200_OK

    def test_update(self):
        response = self.client.patch(self.url, data={'first_name': 'James', 'last_name': 'Doe'})
        print(response.data)
        assert response.status_code == status.HTTP_200_OK
        self.user.refresh_from_db()
        assert self.user.first_name == 'James'
        assert self.user.last_name == 'Doe'