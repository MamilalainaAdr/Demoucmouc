import math

def saisie_arcs(n):
    """Demande à l'utilisateur de saisir les arcs du graphe.
    Retourne une matrice de distances initialisée."""
    dist = [[math.inf] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    print("Saisie des arcs (entrez -1 pour le sommet source pour terminer)")
    while True:
        try:
            s = input(f"Sommet source (1..{n}) : ")
            if s == "-1":
                break
            i = int(s) - 1
            if not (0 <= i < n):
                print("Indice hors limites")
                continue
            j = int(input(f"Sommet destination (1..{n}) : ")) - 1
            if not (0 <= j < n):
                print("Indice hors limites")
                continue
            poids = float(input("Poids de l'arc : "))
            dist[i][j] = poids
        except ValueError:
            print("Entrée invalide, recommencez.")
    return dist

def demoucron_min(dist):
    n = len(dist)
    pred = [[None] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i != j and dist[i][j] != math.inf:
                pred[i][j] = i

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] != math.inf and dist[k][j] != math.inf:
                    nouveau = dist[i][k] + dist[k][j]
                    if nouveau < dist[i][j]:
                        dist[i][j] = nouveau
                        pred[i][j] = pred[k][j]
    return dist, pred

def reconstruire_chemin(pred, s, t):
    if pred[s][t] is None:
        return None
    chemin = [t]
    while t != s:
        t = pred[s][t]
        chemin.append(t)
    chemin.reverse()
    return [x+1 for x in chemin]

def afficher_matrice(mat, titre):
    print(f"\n{titre}")
    n = len(mat)
    # En-tête des colonnes
    print("   " + " ".join(f"{j+1:4}" for j in range(n)))
    for i in range(n):
        ligne = f"{i+1:2} "
        for val in mat[i]:
            if val == math.inf:
                ligne += "  +∞ "
            else:
                ligne += f"{val:4.0f}"
        print(ligne)

def main():
    print("=== Algorithme de DEMOUCRON (Floyd-Warshall) ===")
    n = int(input("Nombre de sommets : "))
    dist = saisie_arcs(n)

    afficher_matrice(dist, "Matrice initiale D1")

    dist_finale, pred = demoucron_min(dist)

    afficher_matrice(dist_finale, "Matrice finale des distances")

    # Reconstruction d'un chemin (optionnel)
    rep = input("\nVoulez-vous reconstruire un chemin ? (o/n) : ")
    if rep.lower() == 'o':
        s = int(input(f"Sommet de départ (1..{n}) : ")) - 1
        t = int(input(f"Sommet d'arrivée (1..{n}) : ")) - 1
        chemin = reconstruire_chemin(pred, s, t)
        if chemin is None:
            print("Aucun chemin trouvé.")
        else:
            print("Chemin :", " → ".join(str(s) for s in chemin))
            print("Longueur :", dist_finale[s][t])

if __name__ == "__main__":
    main()