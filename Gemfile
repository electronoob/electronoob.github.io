source 'https://rubygems.org'
gem 'github-pages'
require 'rbconfig'
if RbConfig::CONFIG['target_os'] =~ /bsd|dragonfly/i
gem 'rb-kqueue', '>= 0.2'
# Base versions have known conflicts/bugs
# Even master branches may not work...
gem 'ffi'
gem 'celluloid'
end

