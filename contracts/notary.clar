;; Improved Notary Contract
;; Stores: hash -> {owner, block-height, timestamp}

(define-map notarizations 
  { hash: (buff 32) } 
  { 
    owner: principal, 
    height: uint, 
    time: uint 
  }
)

(define-public (notarize (h (buff 32)))
  (let ((existing (map-get? notarizations {hash: h})))
    (match existing
      some-value (err u100) ;; Hash already exists, prevent overwrite
      (begin
        (map-insert notarizations 
          { hash: h } 
          { 
            owner: tx-sender, 
            height: block-height, 
            time: stacks-block-time 
          }
        )
        (ok true)
      )
    )
  )
)

(define-read-only (get-notarization (h (buff 32)))
  (map-get? notarizations {hash: h})
)