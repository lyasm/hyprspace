(use-package org-modern
  :ensure t
  :hook
  (org-mode . org-modern-mode))

query-replace-history(setq org-preview-latex-default-process 'imagemagick)
(with-eval-after-load 'org
    (add-to-list 'org-latex-packages-alist '("" "chemfig" t)))
