;; Custom stuff
(setq custom-file "~/.emacs.d/data/data_custom/custom-file.el")
(load-file custom-file)

(add-to-list 'custom-theme-load-path "~/.emacs.d/themes/oxocarbon-emacs")
;(load-theme 'everforest-hard-dark t)

(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)
(hl-line-mode t)
