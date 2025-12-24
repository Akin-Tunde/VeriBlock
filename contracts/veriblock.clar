(define-map notarizations 
  { hash: (buff 32) } 
  { 
    owner: principal, 
    height: uint,        ;; Stacks block height
    btc-height: uint,    ;; Bitcoin block height (via burn-block-height)
    timestamp: uint      ;; Network time
  }
)

(define-public (notarize (h (buff 32)))
  (begin
    (asserts! (is-none (map-get? notarizations {hash: h})) (err u100))
    (ok (map-insert notarizations {hash: h} 
      { 
        owner: tx-sender, 
        height: block-height, 
        btc-height: burn-block-height,
        timestamp: stacks-block-time
      }))
  )
)
;; contracts/veriblock.clar
(define-map notarizations 
  { hash: (buff 32) } 
  { 
    owner: principal, 
    height: uint,        ;; Stacks height
    btc-height: uint,    ;; Bitcoin height
    timestamp: uint 
  }
)

(define-public (notarize (h (buff 32)))
  (begin
    (asserts! (is-none (map-get? notarizations {hash: h})) (err u100))
    (let ((data { 
            owner: tx-sender, 
            height: block-height, 
            btc-height: burn-block-height,
            timestamp: stacks-block-time
          }))
      (map-insert notarizations {hash: h} data)
      ;; Emit event for frontend indexing
      (print { action: "notarize", hash: h, data: data })
      (ok true)
    )
  )
)