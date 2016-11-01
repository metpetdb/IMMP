
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  config.vm.define :djangovm do |cfg|
    # Every Vagrant virtual environment requires a box to build off of.
    cfg.vm.box = "ubuntu/trusty64"

    # Forward a port from the guest to the host, which allows for outside
    # computers to access the VM, whereas host only networking does not.
    cfg.vm.forward_port 80, 8080
    # To access our website, we can open a web browser on our workstation 
    # and go to http://localhost:5001. 
    cfg.vm.forward_port 5000, 5001
  end
end