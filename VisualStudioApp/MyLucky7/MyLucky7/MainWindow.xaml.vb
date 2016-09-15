Class MainWindow 
    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click()
    End Sub

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Foto.Visibility = False 'ocultar imagen
        Label1.InputHitTest = CStr(Int(Rnd() * 10)) 'generar números
        Label2 = CStr(Int(Rnd() * 10))
        Label3 = CStr(Int(Rnd() * 10))
    End Sub
End Class
