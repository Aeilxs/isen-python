from django.contrib.auth.models import User # type: ignore

from users.forms import SignUpForm

import pytest


@pytest.mark.django_db
def test_signup_form_validate():

    """
    Testing the SignUpForm to check if the user input data is properly validated or not
    """

    temp_user = {
        'username': 'TestUser',
        'password1': 'test-password',
        'password2': 'test-password',
        'email': 'testuser@testing.com',
        'first_name': 'Test',
        'last_name': 'User'
    }

    user = SignUpForm(data=temp_user)    

    assert user.is_valid()


@pytest.mark.django_db
def test_signup_form_save_method():

    """
    Testing if the User object is created properly by using SignUpForm or not
    """

    temp_user = {
        'username': 'TestUser',
        'password1': 'test-password',
        'password2': 'test-password',
        'email': 'testuser@testing.com',
        'first_name': 'Test',
        'last_name': 'User'
    }

    form = SignUpForm(data=temp_user)
    user = form.save()

    assert isinstance(user, User)