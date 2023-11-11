(setq-default indent-tabs-mode t)
(add-hook 'prog-mode-hook #'whitespace-mode)
(setq whitespace-style '(face tabs spaces trailing space-before-tab newline indentation empty space-after-tab space-mark tab-mark newline-mark missing-newline-at-eof))
(add-hook 'prog-mode-hook #'electric-pair-mode)
(add-hook 'prog-mode-hook #'display-line-numbers-mode)
(setq display-line-numbers-offset 0)

(use-package lsp-mode
  :hook (
         (prog-mode .  (lambda ()
            (unless (eq major-mode 'emacs-lisp-mode)
              (lsp))))
         (lsp-mode . lsp-enable-which-key-integration)
	 (lsp-mode . yas-global-mode)
	 (latex-mode . lsp-mode)
	 (LaTeX-mode . lsp-modes))
  :diminish (lsp-mode . "lsp")
  :commands lsp)

(use-package lsp-ui
  :ensure t
  :defer t
  :hook
  (lsp-mode . lsp-ui-mode))
(use-package helm-lsp :commands helm-lsp-workspace-symbol)
(use-package lsp-treemacs :commands lsp-treemacs-errors-list)

(setq company-idle-delay 0.0
      company-minimum-prefix-length 1
      lsp-idle-delay 0.1)

;;Shows parenthesis 
(show-paren-mode 1)
; Shows column number
(column-number-mode 1)
;;c-stuff
(load-file "~/.emacs.d/prog/c.el")
;;web
(load-file "~/.emacs.d/prog/web.el")
