resource "helm_release" "check24-tippspiel-challenge" {
  name  = "check24-tippspiel-challenge"

  repository = "oci://289782752698.dkr.ecr.us-east-1.amazonaws.com"
  chart = "check24-tippspiel-challenge"

  values = [
    file("${path.root}/helm/values.production.yaml")
  ]
}