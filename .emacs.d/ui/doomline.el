(use-package doom-modeline
  :ensure t
  :config
  (setq doom-modeline-hud nil
	doom-modeline-minor-modes t
	doom-modeline-indent-info t
	doom-modeline-total-line-number t
	doom-modeline-checker-simple-format nil
	doom-modeline-buffer-encoding nil
	)
  :hook (after-init . doom-modeline-mode))

(defun show-wc-doom ()
  "if not programming, show word count"
  (unless (derived-mode-p 'prog-mode)
    (setq doom-modeline-enable-word-count t)))

(add-hook 'after-change-major-mode-hook #'show-wc-doom)
