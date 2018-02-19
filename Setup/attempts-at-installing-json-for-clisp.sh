git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.4.2
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc

sudo apt-get update
sudo apt-get install darcs

sudo apt-get update && sudo apt-get install cl-quicklisp
sudo apt-get install sbcl
clisp -x '(load #p"/usr/share/cl-quicklisp/quicklisp.lisp")'

sbcl --load '/usr/share/cl-quicklisp/quicklisp.lisp'
(quicklisp-quickstart:install)
(ql:quickload "cl-json")
(ql:add-to-init-file)

(quit)

(ql:quickload :jonathan)

(load #p"/usr/share/cl-quicklisp/quicklisp.lisp")
(quicklisp-quickstart:install)
