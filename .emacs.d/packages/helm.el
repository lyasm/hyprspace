;; (use-package helm
;;   :ensure t
;;   :defer t
;;   :init
;;   (add-hook 'after-init-hook #'helm-mode))


(use-package counsel
  :ensure t
  :after ivy
  :diminish
  :hook (ivy-mode . counsel-mode))

(use-package ivy
  :ensure t
  :defer t
  :bind
  (:map ivy-minibuffer-map
         ("C-j" . ivy-immediate-done)
         ("C-m" . ivy-alt-done))
  :config
  (setq ivy-use-virtual-buffers t)
  (setq enable-recursive-minibuffers t)
  (setq ivy-use-selectable-prompt t)
  (setq ivy-count-format "(%d/%d) ")
  :init
  (add-hook 'after-init-hook #'ivy-mode))
  (add-hook 'after-init-hook #'ivy-mode)




(use-package swiper
  :ensure t
  :after ivy
  :bind (("C-s" . swiper)
         ("C-r" . swiper)))

;; (use-package helm-descbinds
;;   :ensure t
;;   )

;;  ;; (use-package helm-flyspell
;;  ;;  :ensure t
;;  ;;  )
;; ;; slow

;; (use-package helm-flycheck
;;   :ensure t
;;   )

;; (use-package helm-lsp
;;   :ensure t
;;   )

;; (use-package helm-unicode
;;   :ensure t
;;   )

;; (use-package helm-xref
;;   :ensure t
;;   )

;; (define-key global-map [remap find-file] #'helm-find-files)
;; (define-key global-map [remap execute-extended-command] #'helm-M-x)
;; (define-key global-map [remap switch-to-buffer] #'helm-mini)
