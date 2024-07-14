# Environment Vars and their Usage



To allow the nokogiri gem to link against this libxslt run:
  gem install nokogiri -- --with-xslt-dir=/usr/local/opt/libxslt

libxslt is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have libxslt first in your PATH, run:
  echo 'export PATH="/usr/local/opt/libxslt/bin:$PATH"' >> ~/.zshrc

For compilers to find libxslt you may need to set:
  export LDFLAGS="-L/usr/local/opt/libxslt/lib"
  export CPPFLAGS="-I/usr/local/opt/libxslt/include"

For pkg-config to find libxslt you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/libxslt/lib/pkgconfig"
==> Summary
🍺  /usr/local/Cellar/libxslt/1.1.38: 100 files, 1.2MB
==> Running `brew cleanup libxslt`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Caveats
==> libxslt
To allow the nokogiri gem to link against this libxslt run:
  gem install nokogiri -- --with-xslt-dir=/usr/local/opt/libxslt

libxslt is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have libxslt first in your PATH, run:
  echo 'export PATH="/usr/local/opt/libxslt/bin:$PATH"' >> ~/.zshrc

For compilers to find libxslt you may need to set:
  export LDFLAGS="-L/usr/local/opt/libxslt/lib"
  export CPPFLAGS="-I/usr/local/opt/libxslt/include"

For pkg-config to find libxslt you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/libxslt/lib/pkgconfig"
Warning: Refusing to link macOS provided/shadowed software: libxml2
If you need to have libxml2 first in your PATH, run:
  echo 'export PATH="/usr/local/opt/libxml2/bin:$PATH"' >> ~/.zshrc

For compilers to find libxml2 you may need to set:
  export LDFLAGS="-L/usr/local/opt/libxml2/lib"
  export CPPFLAGS="-I/usr/local/opt/libxml2/include"

For pkg-config to find libxml2 you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/libxml2/lib/pkgconfig"
Warning: Refusing to link macOS provided/shadowed software: libxslt
If you need to have libxslt first in your PATH, run:
  echo 'export PATH="/usr/local/opt/libxslt/bin:$PATH"' >> ~/.zshrc

For compilers to find libxslt you may need to set:
  export LDFLAGS="-L/usr/local/opt/libxslt/lib"
  export CPPFLAGS="-I/usr/local/opt/libxslt/include"

For pkg-config to find libxslt you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/libxslt/lib/pkgconfig"
Warning: openssl@3 3.1.1 is already installed and up-to-date.
