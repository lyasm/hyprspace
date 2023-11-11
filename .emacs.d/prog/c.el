(setq c-default-style "linux")
(add-hook 'c-mode-hook #'c-toggle-hungry-state)
(add-hook 'c-mode-hook 'lsp)
(add-hook 'c++-mode-hook 'lsp)
