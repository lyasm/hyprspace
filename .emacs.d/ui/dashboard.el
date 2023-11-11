;; -*- lexical-binding: t -*-
(use-package dashboard
  :ensure t
  :config
  (dashboard-setup-startup-hook)
					;(delete-other-windows)
  )

(use-package recentf
  :ensure nil
  :hook (after-init . recentf-mode)
  :custom
  (recentf-auto-cleanup "05:00am")
  (recentf-max-saved-items 200)
  (recentf-exclude '((expand-file-name package-user-dir)
                     ".cache"
                     ".cask"
                     ".elfeed"
                     "bookmarks"
                     "cache"
                     "ido.*"
                     "persp-confs"
                     "recentf"
                     "undo-tree-hist"
                     "url"
                     "COMMIT_EDITMSG\\'")))

(setq dashboard-banner-logo-title "Emacs: Turning text editing into an extreme sport since 1976")
;; Set the title
;; Set the banner
(setq dashboard-startup-banner "/home/lyasm/Images/resized/emacs-glass.png")

;; Content is not centered by default. To center, set
(setq dashboard-center-content t)

;; To disable shortcut "jump" indicators for each section, set
(setq dashboard-show-shortcuts nil)
;; use `all-the-icons'
(setq dashboard-icon-type 'all-the-icons)
(setq dashboard-set-file-icons t)
(setq dashboard-set-navigator nil)

(defun shorten-string (str first last)
  "Shorten a string to keep the [first] first and [last] last characters and add '...' in the middle"
  (setq str (replace-regexp-in-string "[-_\\/]" "" str))
  (setq str (replace-regexp-in-string "\\(.*\\)\\(\\.\\).*" "\\1" str))
  (if (> (length str) (+ first last 3))
      (concat (substring str 0 first) "..." (substring str (- (length str) last)))
    ;; (format (concat "%" (number-to-string (+ first last)) "s") str)
    (concat (make-string (/ (- (+ last first 3) (length str)) 2) ?\s) str (make-string (/ (- (+ last first 3) (length str)) 2) ?\s))
    ))

(defun dashboard-insert-custom (list-size)
  (dashboard-insert-heading "Recent Files:"
                            nil
                            (all-the-icons-faicon "file-o"
                                                  :height 1.2
                                                  :v-adjust 0.0
                                                  :face 'dashboard-heading))
  (insert "\n")
  (recentf-load-list)


  (setq n 1)
  (let ((recent-files (seq-take recentf-list 10)))
    (dolist (file recent-files)
      (insert (all-the-icons-icon-for-file file) " ")
      (insert-button (shorten-string (file-name-nondirectory file) 6 5)
		     'action (lambda (button) (find-file file))
		     'face 'dashboard-items-face
		     'help-echo file)
      (if (> n 1) (progn (insert "\n") (setq n 1)) (progn (setq n (+ n 1)) (insert "\t")))
      )
    )
  )


(defun random-fortune (fortune-file)
  "Get a random fortune message from the specified FORTUNE-FILE."
  (interactive "Specify a fortune file: ")
  (with-temp-buffer
    (call-process "fortune" nil t nil fortune-file)
    (buffer-string)))

(setq dashboard-footer-messages (list (random-fortune "/usr/share/fortune/linux")))

(setq dashboard-footer-icon (all-the-icons-faicon "linux"
                                                   :height 1.1
                                                   :v-adjust -0.05))

(add-to-list 'dashboard-item-generators '(custom . dashboard-insert-custom))
(add-to-list 'dashboard-item-generators '(time . dashboard-insert-time))
(setq dashboard-items '((custom)
                        (bookmarks . 5)))

(custom-set-faces
 '(dashboard-banner-logo-title ((t (:height 120)))))
(setq dashboard-image-banner-max-height (* (min (frame-height) (/ (frame-width) 2.5)) 6))
