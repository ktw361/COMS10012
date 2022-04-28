package uk.ac.bristol.cs.application.model;

import com.fasterxml.jackson.annotation.JsonView;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Ward extends ModelClass implements Serializable {
    private @Id int id;
    private String name;
    private int electorate;
    
    // @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    // @JsonView(Ward.class)
    // private List<Ward> wards;
    
    public int getId() { return id; }
    public String getName() { return name; }
    public int getElectorate() { return electorate; }
    // public List<Ward> getWards() { return wards; }

    public void setId(int code) { this.id = id; }
    public void setName(String name) { this.name = name; }
    // public void setWards(List<Ward> wards) { this.wards = wards; }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 83 * hash + Objects.hashCode(this.id);
        hash = 83 * hash + Objects.hashCode(this.name);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Ward other = (Ward) obj;
        return Objects.equals(this.name, other.name);
    }
}
