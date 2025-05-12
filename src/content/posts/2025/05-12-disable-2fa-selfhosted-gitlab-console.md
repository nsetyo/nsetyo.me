---
title: Disable 2FA on Self Hosted Gitlab
date: 2025-05-12
---

Last time, I lost login access to my self-hosted GitLab instance where I was the
only admin. 2FA kept failing because the server's date and time were incorrect
(which I didn’t realize until after clearing 2FA). I was confused about why 2FA
wasn’t working, so the first thing I did was clear the 2FA configuration. Here's
how I did it:

### Access the ruby console

Because I use Docker to deploy GitLab, I accessed the console using Docker
Compose:

```bash
docker compose exec gitlab gitlab-rails console
```

### Find my user

```ruby
user = User.find_by_username('nsetyo');
```

### Destroy the 2FA service

To destroy the service I use
`TwoFactor::DestroyService.new(admin, user: user_to_disable_2fa)` command. Since
I’m the admin, I ran:

```ruby
TwoFactor::DestroyService.new(user, user:user).execute
```

The expected response should be:

```
=> {:status=>:success}
```

That’s it — 2FA should now be disabled.
